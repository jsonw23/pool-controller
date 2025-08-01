import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GpioPin = {
  __typename?: 'GPIOPin';
  number: Scalars['Int']['output'];
  physicalPin?: Maybe<Scalars['Int']['output']>;
  reservedFor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  gpioPins?: Maybe<Array<Maybe<GpioPin>>>;
};

export type GpioPinsQueryVariables = Exact<{ [key: string]: never; }>;


export type GpioPinsQuery = { __typename?: 'Query', gpioPins?: Array<{ __typename?: 'GPIOPin', number: number, physicalPin?: number | null, reservedFor?: string | null } | null> | null };


export const GpioPinsDocument = gql`
    query GPIOPins {
  gpioPins {
    number
    physicalPin
    reservedFor
  }
}
    `;

/**
 * __useGpioPinsQuery__
 *
 * To run a query within a React component, call `useGpioPinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGpioPinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGpioPinsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGpioPinsQuery(baseOptions?: Apollo.QueryHookOptions<GpioPinsQuery, GpioPinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GpioPinsQuery, GpioPinsQueryVariables>(GpioPinsDocument, options);
      }
export function useGpioPinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GpioPinsQuery, GpioPinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GpioPinsQuery, GpioPinsQueryVariables>(GpioPinsDocument, options);
        }
export function useGpioPinsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GpioPinsQuery, GpioPinsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GpioPinsQuery, GpioPinsQueryVariables>(GpioPinsDocument, options);
        }
export type GpioPinsQueryHookResult = ReturnType<typeof useGpioPinsQuery>;
export type GpioPinsLazyQueryHookResult = ReturnType<typeof useGpioPinsLazyQuery>;
export type GpioPinsSuspenseQueryHookResult = ReturnType<typeof useGpioPinsSuspenseQuery>;
export type GpioPinsQueryResult = Apollo.QueryResult<GpioPinsQuery, GpioPinsQueryVariables>;