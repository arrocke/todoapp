import { NextPage } from "next";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import Page from "../../components/Page";

const ProjectPage: NextPage = props => {
  const router = useRouter();
  return (
    <Page>
      <Navigation />
      <main className="flex-grow">{router.query.id}</main>
    </Page>
  );
};

export default ProjectPage;
