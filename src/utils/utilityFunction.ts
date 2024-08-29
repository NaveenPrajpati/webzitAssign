import Share from 'react-native-share';

export function shareFile() {
  Share.open({title: '', url: '', message: ''})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
}
