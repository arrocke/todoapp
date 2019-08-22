/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateProjectInput = {
  name?: Maybe<Scalars['String']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  createProject: Project,
  updateProject?: Maybe<Project>,
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput
};

export type Project = {
  __typename?: 'Project',
  projectId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type Query = {
  __typename?: 'Query',
  projects: Array<Project>,
  project?: Maybe<Project>,
};


export type QueryProjectArgs = {
  id: Scalars['ID']
};

export type UpdateProjectInput = {
  projectId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};
export type ProjectsQueryVariables = {};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'projectId' | 'name'>
  )> }
);

export const ProjectsDocument = gql`
    query Projects {
  projects {
    projectId
    name
  }
}
    `;

    export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
    };
      export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      };
      
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;