export const environment = {
    production: false,
    apiUrl: 'https://sonarcloud.io/organizations/1809-spark-usf/projects/',
    appUrl: process.env.RMS_APP_URL || 'localhost:4200',
    serviceContext: {
        resource: 'rms-resource',
        reservation: 'rms-reservation'
    }
};
