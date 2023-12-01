async function createCronJob(url: string) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://api.cron-job.org/jobs';
  
    const jobData = {
      job: {
        url: url,
        enabled: true,
        saveResponses: true,
        schedule: {
          timezone: 'UTC', // Adjust the timezone as needed
          expiresAt: 0,
          hours: [-1],
          mdays: [-1],
          minutes: [0],
          months: [-1],
          wdays: [-1]
        }
      }
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(jobData)
      });
  
      const data = await response.json();
      console.log('Job created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }
  
export default createCronJob;