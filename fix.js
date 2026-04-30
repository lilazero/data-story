const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'components', 'stories');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let compName = file.replace('.tsx', '');
  
  // replace the function signature
  let regex = new RegExp(`export default function ${compName}\\(\\)\\s*\\{`);
  content = content.replace(regex, `export default function ${compName}({ data }: { data?: any[] }) {`);
  
  // replace data={something} with data={data || something}
  content = content.replace(/(<[A-Za-z]+Chart[^>]*?data=\{)([a-zA-Z0-9_]+)(\})/g, (match, p1, p2, p3) => {
    return `${p1}data || ${p2}${p3}`;
  });
  
  fs.writeFileSync(filePath, content);
});
console.log('Done modifying components!');
