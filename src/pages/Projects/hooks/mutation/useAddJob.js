import { useMutation } from "@tanstack/react-query"

export const useAddJob = () => {
    const {mutate} = useMutation({
        mutationFn: () => addjob
    })
}