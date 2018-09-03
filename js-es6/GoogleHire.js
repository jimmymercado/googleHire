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

  /* Fetch jobs by a selected filters with proper error handling.*/
  static fetchJobsByFilters(region, jobtype, callback) {
    GoogleHire.fetchJobs((error, jobs) => {
      if (error) {
        callback(error, null);
      } else {
        let results = jobs;
        // Filter jobs to have only given region
        if (region != 'all') { // filter by region
          results = results.filter(r => r.jobLocation.address.addressCountry == region);
        }

        if (jobtype != 'all') { // filter by region
          results = results.filter(r => r.employmentType == jobtype);
        }
        callback(null, results);
      }
    });
  }

  /* Fetch jobs by a region with proper error handling.*/
  static fetchJobsByRegion(region, callback) {
    GoogleHire.fetchJobs((error, jobs) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter jobs to have only given region
        const results = jobs.filter(r => r.jobLocation.address.addressCountry == region);
        callback(null, results);
      }
    });
  }


  /*Fetch Regions with proper error handling.*/
  static fetchRegions(callback) {
    // Fetch all restaurants
    GoogleHire.fetchJobs((error, jobs) => {
      if (error) {
        callback(error, null);
      } else {
        // Get regions from all job listings
        const regions = jobs.map((v, i) => jobs[i].jobLocation.address.addressCountry)
        // Remove duplicates from neighborhoods
        const uniqueRegions = regions.filter((v, i) => regions.indexOf(v) == i)
        const cleanRegions = GoogleHire.cleanArray(uniqueRegions);
        callback(null, cleanRegions);
      }
    });
  }

  /*Fetch Regions with proper error handling.*/
  static fetchJobTypes(callback) {
    // Fetch all restaurants
    GoogleHire.fetchJobs((error, jobs) => {
      if (error) {
        callback(error, null);
      } else {
        // Get regions from all job listings
        const types = jobs.map((v, i) => jobs[i].employmentType)
        // Remove duplicates from neighborhoods
        const uniqueTypes = types.filter((v, i) => types.indexOf(v) == i)
        const cleanTypes = GoogleHire.cleanArray(uniqueTypes);
        callback(null, cleanTypes);
      }
    });
  }

  static cleanArray(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

}//end class

export {GoogleHire}