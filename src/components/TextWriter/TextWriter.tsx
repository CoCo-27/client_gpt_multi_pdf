import { useState, useEffect, useRef } from 'react';

export default function TypeWriter(props) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [combinedContent, setCombinedContent] = useState('');
  const [index, setIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(true); // State to control visibilit
  const dataFetchedRef = useRef(false);

  let old_index = -1;

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const animKey = setInterval(() => {
      setIndex((index) => {
        if (index >= props.content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, props.speed);
  }, []);

  useEffect(() => {
    let tempCombinedContent = '';
    props.sourceDocuments.forEach(document => {
      tempCombinedContent = tempCombinedContent + '<br />' + document.metadata.source + '<br />' + document.pageContent + '<br />';
    });

    setCombinedContent(tempCombinedContent);
    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
  }, [props.sourceDocuments]);

  useEffect(() => {
    if (old_index == index) return;
    old_index = index;

    setDisplayedContent(
      (displayedContent) => displayedContent + props.content[index]
    );

    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
  }, [index]);

  const handleButtonClick = () => {
    setIsHidden(!isHidden);
  };

  return (<div>
              <p>{displayedContent}</p>
         </div>);
}

// return (<div>
//   <p>{displayedContent}</p>
//   <button onClick={handleButtonClick}>Toggle Content ⬇️</button>
// <p
// dangerouslySetInnerHTML={{ __html: combinedContent }}
// style={{ height: isHidden ? '0' : 'auto', overflow: 'hidden', transition: 'height 0.3s' }}
// ></p>
// </div>);