import React from 'react';
import styled from 'styled-components';
import Editor from '../../components/Code/Editor';
import Interface from '../../components/Code/Interface';
import Terminal from '../../components/Code/Terminal';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Code() {
  const [output, setOutput] = React.useState('');

  return (
    <div>
      <FlexContainer>
        <Interface />
        {/* <Editor output={output} setOutput={setOutput} />
        <Terminal initialText='$  ' output={output} /> */}
      </FlexContainer>
    </div>
  );
}

export default Code;
