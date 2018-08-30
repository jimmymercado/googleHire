import 'whatwg-fetch';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

class GoogleHire {
  static get DATABASE_URL() {
    return `https://hire.withgoogle.com/v2/api/t/dromae/public/jobs`;
  }

  static fetchJobs(callback){
    
    fetch(GoogleHire.DATABASE_URL)
    .then(resp => resp.json())
    .then(resp => {
      callback(null, resp);
    })
    .catch(err => {
      alert('failed fecth');
      callback(err, null);
    })
  }
  

  static fetchJobsXHR(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', GoogleHire.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const jobs = json;
        callback(null, jobs);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

}//end class

export {GoogleHire}