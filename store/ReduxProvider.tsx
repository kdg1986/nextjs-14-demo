import store from "@/store";
import {Provider} from "react-redux";

const ReduxProvider = ({children}: {children: React.ReactNode}) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
