# backend/utils/graph.py
# DAG detection algorithm using Kahn's algorithm (topological sort)

from typing import List, Dict, Set
from collections import deque, defaultdict

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Determine if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sorting.
    
    Args:
        nodes: List of node dictionaries with 'id' field
        edges: List of edge dictionaries with 'source' and 'target' fields
    
    Returns:
        bool: True if the graph is a DAG, False otherwise
    """
    # Handle empty graph
    if not nodes:
        return True
    
    # Build adjacency list and calculate in-degrees
    adjacency_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    node_ids = {node['id'] for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        # Only process edges between existing nodes
        if source in node_ids and target in node_ids:
            adjacency_list[source].append(target)
            in_degree[target] += 1
    
    # Initialize queue with nodes that have in-degree 0
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    
    # Process nodes
    processed_count = 0
    
    while queue:
        # Remove a node from queue
        current = queue.popleft()
        processed_count += 1
        
        # Decrease in-degree of neighbors
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            
            # If in-degree becomes 0, add to queue
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes are processed, it's a DAG
    # If some nodes remain (cycle detected), it's not a DAG
    return processed_count == len(node_ids)


def detect_cycles(nodes: List[Dict], edges: List[Dict]) -> List[List[str]]:
    """
    Detect all cycles in the graph (optional utility function).
    
    Args:
        nodes: List of node dictionaries
        edges: List of edge dictionaries
    
    Returns:
        List of cycles, where each cycle is a list of node IDs
    """
    # This is a more complex function that could be implemented
    # for providing detailed cycle information to users
    # For now, we just use is_dag() which is sufficient
    pass
