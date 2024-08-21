import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import * as WebBrowser from "expo-web-browser"

const useWarmUpBrowser = () => {
 useEffect(()=>{
    void WebBrowser.warmUpAsync()

    return ()=>{

        WebBrowser.coolDownAsync()
    }

 },[])
}

export default useWarmUpBrowser

const styles = StyleSheet.create({})