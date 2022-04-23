import { InferGetStaticPropsType } from "next";
import { Example } from "../../components/Example";
import { DateInput } from "../../examples/DateInput";
import { fetchFromGitHub } from "../../utils/fetchFromGitHub";

export default function DateInputPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Example demo={<DateInput />} title="DateInput" {...props}>
      👀
    </Example>
  );
}

export async function getStaticProps() {
  return {
    props: await fetchFromGitHub("/packages/www/examples/DateInput.tsx"),
  };
}
