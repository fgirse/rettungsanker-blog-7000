import { getPayload } from "payload";
import config from "@payload-config";
import AboutClient from "./AboutClient";

export default async function About() {

  const payload = await getPayload({config});

  const{docs: [aboout],} = await payload.find({
    collection: "about"
  });

  if (!aboout) {
    return <div>No About Data Found</div>;
  }

  return <AboutClient aboout={aboout} />;
}
