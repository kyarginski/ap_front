import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Another Platform',
  });

  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
    />
  );
};
