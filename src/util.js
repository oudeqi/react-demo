export function getRedirectPath ({type, avatar}) {
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += '-info'
  }
  return url
}

export function getChatID (userID, targetID) {
  return [userID, targetID].sort().join('_')
}