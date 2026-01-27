import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
    try {
        return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (e) {
        return dateString;
    }
};
