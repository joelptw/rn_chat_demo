import React from 'react'
import firebase from 'react-native-firebase'

const getToken = async () => {

}

export const checkPermission= () => {
    const enabled = await firebase.messaging().hasPermission()
    if(enabled) {
        
    }
}