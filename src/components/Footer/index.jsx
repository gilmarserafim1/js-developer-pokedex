import './styles.css'

const Footer = ({onClick, isVisible = true}) => {
    return (
        <footer id="footer" style={{ display: isVisible ? 'flex' : 'none' }}>
            <button onClick={onClick} id="loadMore" type="button">Load More</button>            
        </footer>
    );
}

export default Footer;