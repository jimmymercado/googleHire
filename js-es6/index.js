import {GoogleHire} from './googleHire';
var allJobs, regions, jobTypes;


/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchAllJobs(); 
  fetchRegions();
  fetchJobTypes();
});

/* Fetch Regions and set their HTML */
const fetchAllJobs = () => {
  GoogleHire.fetchJobs((err, jobs) => {
    if(err){
        console.log('Error: ',  err);
    }else{
      allJobs = jobs;
      fillJobs(jobs)
    }
  }) 
}




const fillJobs = (jobs) => {
  const ul = document.getElementById('job-list');
  jobs.forEach(job => {
    //console.log(job.jobLocation.address);
    ul.appendChild(createList(job));
  });
}


const createList = (job) => {

  const a = document.createElement('a');
  a.setAttribute('href', job.url);
  a.setAttribute('class', 'jobLink');
  a.setAttribute('target', '_new');
  
  if(job.employmentType){
      a.innerHTML = job.title + ' (' + job.employmentType + ')'; 
  }else{
      a.innerHTML = job.title;
  }
  
  const li = document.createElement('li');
  li.appendChild(a);
  
  const location = document.createElement('p');
  let strLocation = '';
  let objLocation = job.jobLocation;
  if(job.jobLocation){
      //console.log(objLocation.address);
      
      if(objLocation.address.addressCountry){
          strLocation = objLocation.address.addressCountry;
      }
      if(objLocation.address.addressRegion){
          strLocation = strLocation + ' - ' + objLocation.address.addressRegion;
      }
      if(objLocation.address.addressLocality){
          strLocation = strLocation + ', ' + objLocation.address.addressLocality;
      }
      location.innerHTML = strLocation;
      
  }
  li.appendChild(location);
  
  return li;
}
  

function getJobsByCountry(jobs){
  var arrCountry = new Array();
  jobs.forEach(job => {
      
    if(job.jobLocation.address.addressCountry){
      console.log(job.jobLocation.address.addressCountry);
      arrCountry.push(job.jobLocation.address.addressCountry);
    }      
  });
  return arrCountry;
}


/* Fetch Regions and set their HTML */
const fetchRegions = () => {
  GoogleHire.fetchRegions((error, regions) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.regions = regions;
      //fillNeighborhoodsHTML();
      console.log(regions);
    }
  });
}

/* Fetch Regions and set their HTML */
const fetchJobTypes = () => {
  GoogleHire.fetchJobTypes((error, jobTypes) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.jobTypes = jobTypes;
      //fillNeighborhoodsHTML();
      console.log(jobTypes);
    }
  });
}