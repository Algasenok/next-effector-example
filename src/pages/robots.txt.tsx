import { NextPage } from 'next';
import { createGIP } from '@/models/shared';
import { getRobotsTxt, $robotsText } from '@/models/common';
import { useStore } from 'effector-react/scope';

const RobotsTxt: NextPage = () => {
  const robotsTxt = useStore<string | null>($robotsText);

  if (!robotsTxt) {
    return null;
  }

  return <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{robotsTxt}</pre>;
};

RobotsTxt.getInitialProps = createGIP({
  pageEvent: getRobotsTxt,
});

export default RobotsTxt;
