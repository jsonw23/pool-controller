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

export type ConnectionInput = {
  device: DeviceInput;
  pin: Scalars['Int']['input'];
};

/** Anything connected to a GPIO Pin */
export type Device = {
  on?: Maybe<Scalars['Boolean']['output']>;
  pin?: Maybe<GpioPin>;
};

export type DeviceInput = {
  label: Scalars['String']['input'];
};

/** A GPIO pin on the Raspberry Pi board */
export type GpioPin = {
  __typename?: 'GPIOPin';
  device?: Maybe<Device>;
  number: Scalars['Int']['output'];
  physicalPin?: Maybe<Scalars['Int']['output']>;
  reservedFor?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Designates which pin a given device is connected to */
  connectDevice?: Maybe<Device>;
  /** Creates a relay in the system */
  createRelay?: Maybe<Relay>;
  /** Removes the connection designation from the given relay */
  disconnectDevice?: Maybe<Device>;
  /** Turns off the relay with the given label */
  turnOffRelay?: Maybe<Relay>;
  /** Turns on the relay with the given label */
  turnOnRelay?: Maybe<Relay>;
};


export type MutationConnectDeviceArgs = {
  connection?: InputMaybe<ConnectionInput>;
};


export type MutationCreateRelayArgs = {
  relay: RelayInput;
};


export type MutationDisconnectDeviceArgs = {
  device: DeviceInput;
};


export type MutationTurnOffRelayArgs = {
  relay: RelayInput;
};


export type MutationTurnOnRelayArgs = {
  relay: RelayInput;
};

export type Query = {
  __typename?: 'Query';
  /** Returns all of the available GPIO pins */
  gpioPins?: Maybe<Array<GpioPin>>;
  /** Returns the relay with the given label */
  relayLabeled?: Maybe<Relay>;
  /** Returns the relay that's connected to the given pin */
  relayOnPin?: Maybe<Relay>;
  /** Returns the relays registered in the system */
  relays?: Maybe<Array<Maybe<Relay>>>;
};


export type QueryRelayLabeledArgs = {
  label: Scalars['String']['input'];
};


export type QueryRelayOnPinArgs = {
  number: Scalars['Int']['input'];
};

/** A relay switch that can be turned on and off */
export type Relay = Device & {
  __typename?: 'Relay';
  label: Scalars['String']['output'];
  on?: Maybe<Scalars['Boolean']['output']>;
  pin?: Maybe<GpioPin>;
};

export type RelayInput = {
  label: Scalars['String']['input'];
};

export type GpioPinsQueryVariables = Exact<{ [key: string]: never; }>;


export type GpioPinsQuery = { __typename?: 'Query', gpioPins?: Array<{ __typename?: 'GPIOPin', number: number, physicalPin?: number | null, reservedFor?: string | null }> | null };


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