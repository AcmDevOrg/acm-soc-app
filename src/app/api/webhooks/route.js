import { Webhook } from 'svix';
import { headers } from 'next/headers';
// eslint-disable-next-line no-unused-vars
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';

export async function POST(req) {
  // eslint-disable-next-line no-undef
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  
  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);


  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { id, first_name, last_name, image_url, email_addresses, username } = 
    evt?.data;
    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.log('Error updating user metadata:', error);
        }
      }
      
    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }

  if (eventType === 'user.deleted') {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { id } = evt?.data;
    try {
      await deleteUser(id);
    } catch (error) {
      console.log('Error deleting user:', error);
      return new Response('Error occured', {
        status: 400,
      });      
    }
  }

  return new Response('', { status: 200 });
}