import MasonryLayout from '@components/atoms/masonry'
import SnippetCard from '@components/molecules/snippet-card'
import { db } from '@lib/constants/dbConfig'
import { useLoaderData } from 'react-router'

const snippets = [
  {
    id: 1,
    title: 'Sample Snippet',
    description: 'This is a sample snippet description.',
    code: `const hello = 'Hello, world!';\nconsole.log(hello);`
  },
  {
    id: 2,
    title: 'Another Snippet',
    description: 'This is another snippet description.',
    code: `const greet = name => \`Hello, \${name}!\`;\ngreet('Alice');`
  },
  {
    id: 3,
    title: 'Yet Another Snippet',
    description: 'This is yet another snippet description.',
    code: 'const add = (a, b) => a + b;\nconsole.log(add(2, 3));'
  },
  {
    id: 4,
    title: 'Button ant design',
    description: 'This is a sample snippet description.',
    code: `import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
);

export default App;`
  },
  {
    id: 5,
    title: 'Button material ui',
    description: 'This is a sample snippet description.',
    code: `import React from 'react';
import { Button, Stack } from '@mui/material';

const MaterialButton: React.FC = () => (
  <Stack spacing={2}>
    <Button variant="contained">Contained Button</Button>
    <Button variant="outlined">Outlined Button</Button>
    <Button variant="text">Text Button</Button>
  </Stack>
);

export default MaterialButton;`
  },
  {
    id: 6,
    title: 'Buttons, Flex ant design',
    description: 'This is a sample snippet description.',
    code: `import { Masonry } from 'react-plock'

interface MasonryProps {
  items: { id: number; title: string; description: string; code: string }[]
  children: (item: {
    id: number
    title: string
    description: string
    code: string
  }) => React.ReactNode
}

const CONFIG = {
  columns: [1, 2],
  gap: [16, 16],
  media: [640, 768]
}

const MasonryLayout: React.FC<MasonryProps> = ({ items, children }) => {
  return (
    <Masonry items={items} config={CONFIG} render={item => children(item)} />
  )
}

export default MasonryLayout
`
  },
  {
    id: 7,
    title: 'Shiki and monaco',
    description: 'This is a sample snippet description.',
    code: `import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

function MonacoEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.create(editorRef.current, {
        value: '// Code here',
        language: 'javascript',
        lineDecorationsWidth: 20, // Example: increased padding
        theme: 'vs-dark',
        // ... other options
      });
    }
  }, []);

  return (
    <div
      style={{ width: '100%', height: '500px' }}
      ref={editorRef}
    ></div>
  );
}

export default MonacoEditor;`
  }
]

export const loaderHome = async () => {
  const result = await db.select('select * from categories;')

  return { result }
}

const Home: React.FC = () => {
  const { result } = useLoaderData()

  console.log(result)

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Snippets</h1>
      <MasonryLayout items={snippets}>
        {item => (
          <SnippetCard key={item.id} title={item.title} rawValue={item.code} />
        )}
      </MasonryLayout>
    </>
  )
}

export default Home
