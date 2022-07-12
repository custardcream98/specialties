import React, { useEffect, useState } from "react";
import utf8 from "utf8";

const LogInKaikas = () => {
  const [publicAccount, setPublicAccount] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onClick = async () => {
    await loadAccountInfo();

    if (publicAccount) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
        body: JSON.stringify({ address: publicAccount }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((users) => (users.nonce !== 0 ? users : handleSignup()))
        .then(handleSignMessage)
        .then(handleAuthenticate);
    }
  };

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setPublicAccount(klaytn.selectedAddress);
      } catch (error) {
        console.log("User denied account access");
        console.log(error);
        setIsLoaded(false);
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
      setIsLoaded(false);
    }

    return;
  };

  const handleSignup = async () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup/`, {
      body: JSON.stringify({ address: publicAccount }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = ({ nonce }) => {
    const { sign } = window.caver.klay;
    const message = `Specialties 로그인을 위한 서명입니다.\n로그인을 위한 과정이니 걱정하지 마세요!\n\nnonce : ${nonce}`;
    return new Promise((resolve, reject) =>
      sign(message, publicAccount, (err, signature) => {
        if (err) return reject(err);
        return resolve({ signature });
      })
    );
  };

  const handleAuthenticate = async ({ signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/auth/`, {
      body: JSON.stringify({
        address: publicAccount,
        signature,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  return (
    <div>
      {isLoaded ? (
        `Loaded`
      ) : (
        <button onClick={onClick}>카이카스 로그인하기</button>
      )}
    </div>
  );
};

export default LogInKaikas;

// class KaikasPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       txType: null,
//       account: "",
//       balance: 0,
//       network: null,
//     };
//   }

//   componentDidMount() {
//     this.loadAccountInfo();
//     this.setNetworkInfo();
//   }

//   selectTxType = (txType) => this.setState({ txType });

//   renderTxExample = (txType, from) => {
//     switch (txType) {
//       case "Value Transfer (Legacy)":
//         return <ValueTransferLegacy from={from} />;
//       case "Smart Contract Deploy (Legacy)":
//         return <SmartContractDeployLegacy from={from} />;
//       case "Token Transfer (Legacy)":
//         return <SmartContractExecutionLegacy from={from} />;
//       case "Add Token":
//         return <AddToken />;
//       case "Sign Message":
//         return <SignMessage from={from} />;
//       case "Value Transfer":
//         return <ValueTransfer from={from} />;
//       case "Value Transfer (Fee Delegation)":
//         return <ValueTransferFD from={from} />;
//       case "Value Transfer (Fee Delegation with Ratio)":
//         return <ValueTransferFDRatio from={from} />;
//       case "Value Transfer with Memo":
//         return <ValueTransferMemo from={from} />;
//       case "Value Transfer with Memo (Fee Delegation)":
//         return <ValueTransferMemoFD from={from} />;
//       case "Value Transfer with Memo (Fee Delegation with Ratio)":
//         return <ValueTransferMemoFDRatio from={from} />;
//       case "Smart Contract Deploy":
//         return <SmartContractDeploy from={from} />;
//       case "Smart Contract Deploy (Fee Delegation)":
//         return <SmartContractDeployFD from={from} />;
//       case "Smart Contract Deploy (Fee Delegation with Ratio)":
//         return <SmartContractDeployFDRatio from={from} />;
//       case "Token Transfer":
//         return <SmartContractExecution from={from} />;
//       case "Token Transfer (Fee Delegation)":
//         return <SmartContractExecutionFD from={from} />;
//       case "Token Transfer (Fee Delegation with Ratio)":
//         return <SmartContractExecutionFDRatio from={from} />;
//       case "Account Update":
//         return <AccountUpdate from={from} />;
//       case "Account Update (Fee Delegation)":
//         return <AccountUpdateFD from={from} />;
//       case "Account Update (Fee Delegation with Ratio)":
//         return <AccountUpdateFDRatio from={from} />;
//       default:
//         return (
//           <p className="KaikasPage__guide">Select a Transaction example :D</p>
//         );
//     }
//   };

//   render() {
//     const { account, balance, txType, network } = this.state;
//     const txTypeTitles = Object.keys(txTypeList);

//     return (
//       <div className="KaikasPage">
//         <Nav network={network} />
//         <a
//           className="KaikasPage__githubLink"
//           href="https://github.com/klaytn/kaikas-tutorial"
//           title="Link to Kaikas tutorial github repository"
//         >
//           <img src="images/icon-github.svg" alt="Kaikas Tutorial Github" />
//         </a>
//         <div className="KaikasPage__main">
//           <WalletInfo address={account} balance={balance} />
//           <div className="KaikasPage__content">
//             <Dropdown
//               className="KaikasPage__dropdown"
//               placeholder="Transaction Type"
//               selectedItem={txType}
//               handleSelect={this.selectTxType}
//               list={txTypeTitles}
//             />
//             <div className="KaikasPage__txExample">
//               <header className="KaikasPage__txExampleHeader">
//                 <h2 className="KaikasPage__txExampleTitle">{txType}</h2>
//                 {txType && <GithubLink component={txTypeList[txType]} />}
//               </header>
//               {this.renderTxExample(txType, account)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default KaikasPage;
