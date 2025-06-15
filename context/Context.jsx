import {AuthProvider} from "./AuthContext";
import {HistoryProvider} from "@/context/HistoryContext";

export default function Context({ children }) {

    return (
        <AuthProvider>
            <HistoryProvider>
                {children}
            </HistoryProvider>
        </AuthProvider>
    );
}