import styles from './index.css';
import { ErrorBoundary, MenuBar } from '@/components/index';
import { useLocation } from 'umi';

function BasicLayout(props) {
  const location = useLocation();
  console.log(location);
  const paths = ['/', '/order', '/user'];
  return (
    <div>
      <MenuBar show={paths.includes(location.pathname)} pathname={location.pathname} />
      <ErrorBoundary>
        {props.children}
      </ErrorBoundary>
    </div>
  );
}

export default BasicLayout;
