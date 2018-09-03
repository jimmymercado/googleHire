import {GoogleHire} from './googleHire';
var allJobs, regions, jobTypes;


/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchAllJobs(); 
  fetchRegions();
  fetchJobTypes();
  updateJobResults();
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
      //populate Select field
      const select = document.getElementById('region-select');
      select.addEventListener('change', event => {
        updateJobResults();
      });

      regions.forEach(region => {
        const option = document.createElement('option');
        option.innerHTML = region;
        option.value = region;
        select.append(option);
      });
      //console.log(regions);
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
      //populate Select field
      const select = document.getElementById('jobtype-select');
      select.addEventListener('change', event => {
        updateJobResults();
      });

      jobTypes.forEach(jobtype => {
        const option = document.createElement('option');
        option.innerHTML = jobtype;
        option.value = jobtype;
        select.append(option);
      });
      //console.log(jobTypes);
    }
  });
}

const updateJobResults = () => {
  const regionSelect = document.getElementById('region-select');
  const regionIndex = regionSelect.selectedIndex;
  const region = regionSelect[regionIndex].value;

  const jobtypeSelect = document.getElementById('jobtype-select');
  const jobtypeIndex = jobtypeSelect.selectedIndex;
  const jobtype = jobtypeSelect[jobtypeIndex].value;

  GoogleHire.fetchJobsByFilters(region, jobtype, (err, jobs) => {
    if(err){
      console.log(err);
    }else{
      console.log(jobs);
    }
  })
}