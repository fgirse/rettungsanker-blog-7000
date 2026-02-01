import { getPayload } from "payload";
import config from "@payload-config";
import AboutClient from "./AboutClient";

export default async function About() {

  const payload = await getPayload({config});

  const{docs: [about],} = await payload.find({
    collection: "about"
  });

  if (!about) {
    return <div>No About Data Found</div>;
  }

  return <AboutClient about={about} />;
}
