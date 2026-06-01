# Postmark Setup for Consultation Form

To use Postmark for sending consultation booking emails, add the following environment variables to your `.env.local` file:

```
POSTMARK_API_KEY=902ab639-1cd8-4e37-98bb-db206b00eb0d
SENDER_EMAIL=team@abetterchoicecare.com
OWNER_EMAIL=team@abetterchoicecare.com
```

## Email Content

The consultation booking will send two emails:
1. **Customer email** - Sent to the person who booked the consultation with booking confirmation
2. **Owner email** - Sent to the owner/team with new booking notification

Both emails include:
- Recipient's name
- Booked date and time
- Phone number
- Brief information (if provided)

## Testing

After setting up the API key, test the consultation form by:
1. Starting the dev server: `npm run dev`
2. Opening the consultation dialog
3. Filling out the form and submitting
4. Check that the email is sent successfully
