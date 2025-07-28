import { createContext } from "react";

/*
*Steps to create a Context

1. Create Context
2. Create Provider Component, which wraps itself around child Components
3. Use Context in child components

*/

// create a context called MyContext using createContext()
const MyContext = createContext();

// export the context
export default MyContext;