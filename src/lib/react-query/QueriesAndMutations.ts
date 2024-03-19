import {
    useQuery, useMutation,useQueryClient, useInfiniteQuery}from '@tanstack/react-query'
import { createUserAccount, sighInAccount } from '../appwrite/api'
import { INewUser } from '@/types'


export const useCreateUserAccount = ()=>{
    return useMutation({
        mutationFn: (user : INewUser) => createUserAccount(user)
    })
}


export const usesignInAccount = ()=>{
    return useMutation({
        mutationFn: (user: {
            email: string; password: string;
        }) => sighInAccount(user)
    })
}