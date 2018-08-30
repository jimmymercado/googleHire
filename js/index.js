import {GoogleHire} from './GoogleHire';
var allJobs;


GoogleHire.fetchJobsXHR(function(err, jobs){
    if(err){
        console.log('Error: ',  err);
    }else{
        allJobs = jobs;
      //fillJobs(jobs)
      console.log(allJobs);
    }
  })
  
  const fillJobs = function (jobs){
    const ul = document.getElementById('job-list');
    // jobs.forEach(job => {
    //   ul.append(job.title);
    //   ul.append(createList(job));
    // });

    for(var job in jobs){
      console.log(jobs[job].jobLocation.address);
    }
  }
  
  const createList = function(job) {
    const li = document.createElement('li');
    

    const a = document.createElement('a');
    a.setAttribute('href', job.url);
    a.setAttribute('class', 'jobLink');
    a.setAttribute('target', '_new');
    
    if(job.employmentType){
        a.innerHTML = job.title + ' (' + job.employmentType + ')'; 
    }else{
        a.innerHTML = job.title;
    }
    

    li.append(a);
    
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
    li.append(location);
    
    return li;
  }
  

  function getJobsByCountry(jobs){
    var arrCountry = new Array();
    // jobs.forEach(job => {
        
    //   if(job.jobLocation.address.addressCountry){
    //     console.log(job.jobLocation.address.addressCountry);
    //     arrCountry.push(job.jobLocation.address.addressCountry);
    //   }      
    // });

    for(var job in jobs) {
        
      if(jobs[job].jobLocation.address.addressCountry){
        console.log(jobs[job].jobLocation.address.addressCountry);
        arrCountry.push(jobs[job].jobLocation.address.addressCountry);
      }      
    }
    return arrCountry;
  }