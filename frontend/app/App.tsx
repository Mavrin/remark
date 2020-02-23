/** @jsx createElement */
import { createElement } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Provider } from 'react-redux';
import { UserInfo } from './components/user-info';
import { IntlProvider } from 'react-intl';
import { ConnectedRoot } from './components/root';
import { loadLocale } from './utils/loadLocale';
import { Store } from 'redux';
import { Preloader } from '@app/components/preloader';

type Props = {
  page: string;
  defaultLocale: string;
  reduxStore: Store;
  NODE_ID: string;
};

export const App = ({ page, defaultLocale, reduxStore, NODE_ID }: Props) => {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [locale, setLocale] = useState(defaultLocale);
  useEffect(() => {
    loadLocale(locale).then(setMessages);
  }, [locale]);
  if (!messages) {
    return <Preloader />;
  }
  if (page === `user-info`) {
    return (
      <IntlProvider locale={locale} messages={messages}>
        <div id={NODE_ID}>
          <div className="root root_user-info">
            <Provider store={reduxStore}>
              <UserInfo />
            </Provider>
          </div>
        </div>
      </IntlProvider>
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={reduxStore}>
        <ConnectedRoot setLocale={setLocale} />
      </Provider>
    </IntlProvider>
  );
};
