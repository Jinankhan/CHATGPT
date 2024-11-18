import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/srcery.css';
import { Box, Typography } from '@mui/material';
import copy from '../../../../public/assets/copyIcon.svg';
import React, { ReactElement, ReactNode } from 'react';

interface ICodeBlockProps {
  markdown: string;
}

const CodeBlock = (props: ICodeBlockProps) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ className, children, ...props }) {
          const language = className?.replace('language-', '') || 'unknown';
          const content: string = React.Children.toArray(children).reduce(
            (acc: string, item: ReactNode) => {
              return typeof item === 'object' &&
                item !== null &&
                'props' in item
                ? acc + (item as ReactElement).props.children
                : acc + (item as string);
            },
            ''
          );

          return children && children?.toString().split(' ').length <= 2 ? (
            <pre
              style={{
                display: 'inline-block',
                padding: '2.4px 4.8px',
                backgroundColor: '#424242',
                borderRadius: '5px',
                fontSize: '14px',
                margin: '4px'
              }}
            >
              <code
                className={className}
                {...props}
                style={{
                  display: 'inline',
                  backgroundColor: '#424242',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  color: '#ECECEC'
                }}
              >
                {children}
              </code>
            </pre>
          ) : (
            <Box
              sx={{
                display: 'flex',

                flexDirection: 'column',

                maxWidth: '100%',

                background: '#2F2F2F',

                borderRadius: '1rem',

                margin: '10px 0px',

                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: 'space-between',

                  alignItems: 'center',

                  padding: '10px'
                }}
              >
                <Typography variant="h6" fontSize="12px">
                  {language.split(' ')[1]}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',

                    gap: '5px',

                    alignItems: 'center',

                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                  }}
                >
                  <img src={copy} alt="copy" width={18} height={18} />

                  <Typography variant="h6" fontSize="12px">
                    Copy code
                  </Typography>
                </Box>
              </Box>

              <pre
                style={{
                  margin: 0,

                  padding: '10px',

                  backgroundColor: 'rgb(13,13,13)',

                  borderBottomLeftRadius: '0.625rem',

                  borderBottomRightRadius: '0.625rem'
                }}
              >
                <code
                  className={className}
                  {...props}
                  style={{
                    backgroundColor: 'rgb(13,13,13)',

                    wordWrap: 'break-word',

                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {children}
                </code>
              </pre>
            </Box>
          );
        }
      }}
    >
      {props.markdown}
    </ReactMarkdown>
  );
};

export default CodeBlock;
