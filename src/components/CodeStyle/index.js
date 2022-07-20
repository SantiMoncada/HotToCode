import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/github';
import { Container } from "react-bootstrap";

const CodeStyle = ({ className: classNameParent, code, language }) => {
    return (
        <div >
            <Highlight {...defaultProps} code={code} language={language} theme={theme}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} ${classNameParent}`} style={style}>
                        <Container>
                            <br />
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </Container>
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
export default CodeStyle