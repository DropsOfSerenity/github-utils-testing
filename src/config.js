const config = {
  'localhost': {
    AUTH_URL: 'https://gatekeeper-ghutils.herokuapp.com/authenticate',
    CLIENT_ID: '74c39723b7ef80c1470a'
  },
  'githubutils.surge.sh': {
    AUTH_URL: '',
    CLIENT_ID: ''
  }
}[window.location.hostname]

export default config
