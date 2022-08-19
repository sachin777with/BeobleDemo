
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { FC } from 'react'
import { Button, Platform, StyleSheet, View, Text, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';

import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";

const APP_SCHEME = 'beobleConnect'
function WalletConnectDemo(): JSX.Element {
    const PLACE_HOLDER = 'https://dummyimage.com/100x100/ff0&text=no_avatar'


    const connector = useWalletConnect();
    const [remainingBalance, setRemainingBalance] = React.useState<string>('-')
    const [walletAddres, setWalletAddress] = React.useState<string>('')
    const [ensAvatar, setEnsAvatar] = React.useState<string>(PLACE_HOLDER)
    const [ens, setEns] = React.useState<string>('-')
    const [chainId, setChainId] = React.useState<number>(0)

    const disconnect = async () => {



        // TO disconnet

        connector?.killSession()

        // to clear useState
        setRemainingBalance('')
        setWalletAddress('')
        setEnsAvatar('')
        setEns('')
        setChainId(0)
    }


    const storedata = async () => {
        // i am using react  async storage for now, for more security we can use // react-native-secure-storage - npm //

        await AsyncStorage.setItem(
            'remainingBalance',
            remainingBalance
        );

        await AsyncStorage.setItem(
            'walletAddres',
            walletAddres
        );

        await AsyncStorage.setItem(
            'ensAvatar',
            ensAvatar
        );

        await AsyncStorage.setItem(
            'ens',
            ens
        );

        await AsyncStorage.setItem(
            'chainId',
            chainId.toString()
        );

    }

    const getTheData = async (provider: WalletConnectProvider, address: string) => {
        await provider.enable();

        const ethers_provider = new ethers.providers.Web3Provider(provider);
        const signer = ethers_provider.getSigner();
        const balance = await signer.getBalance()
        const balanceInEth = ethers.utils.formatEther(balance);
        const chainIdFromSigner = await signer.getChainId()
        const ensName = await ethers_provider.lookupAddress(address)
        const avatar = await ethers_provider.getAvatar(address)
        const addressFromSigner = await signer.getAddress()

        console.log("addressFromSigner  ", addressFromSigner)
        console.log("ensName  ", ensName)
        console.log("chainIdFromSigner  ", chainIdFromSigner)
        console.log("balance ", balanceInEth)
        console.log("avatar ", avatar)


        setRemainingBalance(balanceInEth)
        setWalletAddress(addressFromSigner)
        avatar ? setEnsAvatar(avatar) : setEnsAvatar(PLACE_HOLDER)
        ensName ? setEns(ensName) : setEns('No ens available!')
        setChainId(chainIdFromSigner)

    }





    if (!connector.connected) {
        /**
         *  Connect! 🎉
         */
        return (<View
            style={styles.Container}
        >
            <>
                {/** show only wallet address exist */  console.log("is it? walletAddress", walletAddres)}
                <ScrollView style={{backgroundColor:'black'}}>
                <View style={styles.itemView}>
                <Text style={styles.text}>{'Demo Metamask connect wallet  - Beoble '}</Text>


                    {(walletAddres) ?

                        <View style={styles.itemView}>
                            <Text style={styles.text}>{'** Below are from previous stored data from \n async storage ** \n \n'}</Text>

                            <Text style={styles.text}>{'Wallet ChainID :  ' + chainId + '\n'}</Text>
                            <Text style={styles.text}>{'ENS :  \n' + ens + '\n'}</Text>
                            <Text style={styles.text}>{'Ens Avatar :  '}</Text>
                            <Image
                                style={{ height: 70, width: 70 }}
                                source={{ uri: ensAvatar }}
                            />
                            <Text style={styles.text}>{'\n \n Wallet Address :  '}</Text>
                            <Text style={styles.text}>{walletAddres + ' \n \n '}</Text>
                            <Text style={styles.text}>{'Wallet Remaining Balance  :  ' + remainingBalance}</Text>
                        </View>
                        : <></>
                    }
                    <Button    title="[ Connect the wallet!] " onPress={() => connector.connect()} />
                    </View>
                </ScrollView>
            </>
        </View>)
    }

    if (!connector?.accounts[0]) {
        Alert.alert("No account availble!!")
        return (<View
            style={styles.Container}
        >
            <Text>{'Demo Metamask connect wallet  - Beoble '}</Text>
        </View>)
    }

    // get only first account for now for the beoble demo
    const account = connector?.accounts[0]
    const chainId_ = connector?.chainId


    // get the provider
    const provider = new WalletConnectProvider({
        rpc: {
            [chainId_]: "https://bsc-dataseed.binance.org",
        },
        chainId: chainId_,
        connector: connector,
        qrcode: false,
    });


    getTheData(provider, account)

    return <ScrollView style={styles.connectedView}>
        <View
        >

            <View style={styles.itemView}>
                <Text style={styles.text}>{'Wallet ChainID :  ' + chainId + ' \n'}</Text>
                <Text style={styles.text}>{'ENS :  \n' + ens + '\n'}</Text>
                <Text style={styles.text}>{'Ens Avatar :  \n'}</Text>
                <Image
                    style={{ height: 70, width: 70 }}
                    source={{ uri: ensAvatar }}
                />
                <Text style={styles.text}>{'\n \n Wallet Address :  \n'}</Text>
                <Text style={styles.text}>{walletAddres + ' \n \n '}</Text>

                <Text style={styles.text}>{'Wallet Remaining Balance  :  ' + remainingBalance}</Text>


            </View>



            <View style={styles.buttonView}>
                <TouchableOpacity
                    onPress={disconnect}
                    style={styles.buttton}>
                    <Text>Disconnect wallet !</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttton}
                    onPress={storedata}
                >
                    <Text>Store in rn-async-storage</Text>
                </TouchableOpacity>
            </View>

        </View>
    </ScrollView>;
}



export default withWalletConnect(WalletConnectDemo, {
    redirectUrl: Platform.OS === 'web' ? window.location.origin : APP_SCHEME,
    storageOptions: {
        asyncStorage: AsyncStorage,
    },

});



const styles = StyleSheet.create({

    itemView: {
        marginTop:35,
        marginBottom:10,
        padding: 10,
        backgroundColor: 'black',
        flex:1,
        width: '100%', justifyContent: 'center', alignItems: 'center'

    },
    buttonView: {
        textAlign:'center',fontSize:20,
        flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
    },
    Container: {
        flex: 1,
        paddingTop:50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: 'blue',
        height: 90,
        width: '30%'
    },
    connectedView: {
        flex: 1,
        backgroundColor: 'black',
        alignContent: 'center',
        
    },
    text: {
        textAlign:'center',
        fontWeight: '300',
        fontSize:20,
        color:"white"
    },
});