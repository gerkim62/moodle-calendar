async function createCronJob(url: string) {
  const apiKey =
    process.env.CRONJOB_API_KEY ||
    "02WqVS2RteUX9JcWk49Rkwr+Ry/jzBXy00PbUhQ4heo=";
  console.log("apiKey", apiKey);
  if (!apiKey)
    throw new Error("cronjob api key not provided (CRONJOB_API_KEY)");
  const apiUrl = "https://api.cron-job.org/jobs";

  const jobData = {
    job: {
      url: url,
      enabled: true,
      saveResponses: true,
      schedule: {
        timezone: "UTC", // Adjust the timezone as needed
        expiresAt: 0,
        hours: [-1], // Execute every hour
        mdays: [-1], // Execute every day of the month
        minutes: [0, 15, 30, 45], // Execute every 15 minutes
        months: [-1], // Execute every month
        wdays: [-1], // Execute every day of the week
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();
    console.log("Job created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export default createCronJob;

