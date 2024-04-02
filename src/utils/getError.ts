import { ErrorData } from "../types/Error";

export default function getError(errors: ErrorData, key: string): null | string {
    try {
        return errors[key][0]
    } catch (error) {
        return null
    }
}
