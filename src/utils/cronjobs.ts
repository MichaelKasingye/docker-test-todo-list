const cron = require('node-cron');
import UserInvitationsService from '../services/user-invitations';

// Schedule the updatePendingInvitationsStatus function to run every day at midnight
// const cronJob =  cron.schedule('0 0 * * *', async () => {
const cronJob = cron.schedule('*/5 * * * *', async () => {
    await UserInvitationsService.updatePendingInvitationsStatus();
});

export const startCronJob = () => {
    cronJob.start();
};
// export default cron;
