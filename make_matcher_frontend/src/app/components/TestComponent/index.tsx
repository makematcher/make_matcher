/**
 *
 * TestComponent
 *
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTestError,
  selectTestLoading,
  selectTestStatus,
} from './slice/selectors';
import { useTestComponentSlice } from './slice';
import { CSSProperties } from 'react';
import { LogoutButton } from '../LogoutButton/Loadable';
import ProfileTest from '../ProfileTest';

interface Props {}

export const testStyles: Record<string, CSSProperties> = {
  container: {
    width: '350px',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
  },
  subHeader: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  button: {
    fontFamily: 'Arial, sans-serif',
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  paragraph: {
    fontFamily: 'Arial, sans-serif',
  },
  successText: {
    fontFamily: 'Arial, sans-serif',
    color: 'green',
  },
  errorText: {
    fontFamily: 'Arial, sans-serif',
    color: 'red',
  },
};

export function TestComponent(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useTestComponentSlice();
  const status = useSelector(selectTestStatus);
  const loading = useSelector(selectTestLoading);
  const error = useSelector(selectTestError);

  return (
    <div style={testStyles.container}>
      <div style={testStyles.header}>Make Matcher Team 1</div>
      <div style={testStyles.paragraph}>(Test Component)</div>
      <div style={testStyles.subHeader}>
        <div>
          <button
            onClick={() => dispatch(actions.fetchStatus())}
            style={testStyles.button}
          >
            FETCH API STATUS
          </button>
          {!loading && !status && !error && (
            <p style={testStyles.paragraph}>Click button to view API Status</p>
          )}
          {loading && <p style={testStyles.paragraph}>Loading...</p>}
          {status && <p style={testStyles.successText}>Status: {status}</p>}
          {error && <p style={testStyles.errorText}>Error: {error}</p>}
          <ProfileTest />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
