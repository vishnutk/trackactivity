
export interface IState {
    isInitialized: boolean;
    signedIn: boolean;
}

export interface IProps {

}

export interface IGoal {
    name: string;
    unit: string;
    suggested: number;
}

export interface IGoogleUser {
    displayName: string;
    photoURL: string;
    email: string;
}

export interface ITarget {
    achieved: number;
    goal: string;
    lastModifled: Date;
    startDate: Date;
    unit: string;
    user: string;
}
  

