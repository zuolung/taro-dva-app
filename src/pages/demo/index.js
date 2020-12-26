import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from "react-redux";
import './index.scss'

@connect(({ demo }) => {
  return {
    data: demo
  };
})
class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { data } = this.props
    return (
      <View className='demo-container'>
        <View>Taro:v3.0.17</View>
        <View>
          demo-page
      </View>
      </View>
    )
  }
}

export default Page;