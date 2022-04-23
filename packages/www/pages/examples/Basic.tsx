import { InferGetStaticPropsType } from "next";
import { Example } from "../../components/Example";
import { Basic } from "../../examples/Basic";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function ExamplesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Example demo={<Basic />} title="Basic" {...props}>
      👀
    </Example>
  );
}

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/Basic.tsx"),
  };
}
