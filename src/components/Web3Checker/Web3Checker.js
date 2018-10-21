import React, { Component } from 'react'
import PropTypes from 'prop-types'

import checkWeb3 from './checkWeb3'
import getSelectedAccount from './getSelectedAccount'
import getSelectedNetwork from './getSelectedNetwork'


export default class Web3Checker extends Component {

  state = {
    isChecked: false,
    isErrored: false,
    error: null
  }

  static defaultProps = {
    web3: null,
    network: null,
    account: null,

    onCheckError: async () => null,
    onCheckSuccess: async () => null,

    renderDefault: () => null,
    renderErrored: () => null,
    renderChecked: () => null,

    checkTimeout: 300
  }

  static propTypes = {
    network: PropTypes.number,
    account: PropTypes.oneOfType([
      PropTypes.oneOf([undefined, null, false]),
      (props, propName, componentName) => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(props[propName])) {
          return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
          Validation failed for value ${props[propName]}.`
          )
        }
      }
    ]),

    onCheckError: PropTypes.func,
    onCheckSuccess: PropTypes.func,

    renderDefault: PropTypes.func,
    renderErrored: PropTypes.func,
    renderChecked: PropTypes.func,

    checkTimeout: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.web3 = null
    this.provider = null
    this.account = null
    this.network = null

    this.check = this.check.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this.check)
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.check)
  }

  async check() {
    try {

      await checkWeb3(window.web3, this.props.network, this.props.account)

    } catch (error) {
      console.error(error)

      //await this.props.onCheckError(error)

      this.setState({
        isErrored: true,
        error
      })

      //setTimeout(() => this.check(window.web3), this.props.checkTimeout)

      return
    }

    this.web3 = window.web3
    this.provider = window.web3.currentProvider
    this.account = await getSelectedAccount(window.web3)
    this.network = await getSelectedNetwork(window.web3)

    await this.props.onCheckSuccess(this.web3, this.provider, this.account, this.network)

    this.setState({
      isChecked: true,
      isErrored: false,
      error: null
    })
  }

  render() {

    let render = this.props.renderDefault()

    if (this.state.isErrored) {
      render = this.props.renderErrored(this.state.error)
    } else if (this.state.isChecked) {
      render = this.props.renderChecked(this.provider, this.account)
    }

    return render
  }
}