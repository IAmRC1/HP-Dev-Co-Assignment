import { Layout } from 'antd'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Details from './components/Details';

const { Header, Footer, Content } = Layout;
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/comments/:id",
      element: <Details />,
    },
]);

export default function App() {
  return (
    <Layout>
        <Header>
            <h3>HP Dev Co Assignment</h3>
        </Header>
        <Content>
            <RouterProvider router={router}>
                <Home />
                <Details />
            </RouterProvider>
        </Content>
        <Footer>
            Created with antd, React Query
        </Footer>
    </Layout>
  );
}
