import { Client, Account} from 'appwrite';
import { api } from '../api';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65894a736d977d41ef2e'); // Replace with your project ID



export const account = new Account(client);
export { ID } from 'appwrite';


// api.config.url = 'https://api.api-ninjas.com/v1/airlines?name=' +'Singapore Airlines';
console.log(" api base url is" + api.apisauce.getBaseURL());
 api.apisauce.get(api.apisauce.getBaseURL(), {name: 'Singapore Airlines'}).then((response) => {
    console.log("response is" + response);
});


api.apisauce
.get(
  api.apisauce.getBaseURL(),
  { name: "Singapore Airlines" },
  { headers: { "X-Api-Key": "mMXp7Y3zZBwXqdSYroY0Rg==ihxi15UUxEkj5O2s" } },
)
.then((response) => {
  console.log("response is " + JSON.stringify(response.data))
})
