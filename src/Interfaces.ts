
export interface IState {
    isInitialized: boolean;
    signedIn: boolean;
}

export interface IProps {

}
export interface ITarget {
    startDate: Date;
    goal: string;
    achieved: number;
    unit: string;
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

