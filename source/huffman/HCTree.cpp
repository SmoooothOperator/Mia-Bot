#include "HCTree.hpp"
using namespace std;

void del(HCNode* node){
    if(node -> c0 == nullptr && node -> c1 == nullptr){
        delete node;
        return;
    }
    if(node -> c0 != nullptr){
        del(node -> c0);
    }
    if(node -> c1 != nullptr){
        del(node -> c1);
    }
    delete node;
    return;
}

HCTree::~HCTree(){
    del(root);
    leaves.clear();
    root = nullptr;
}


void HCTree::build(const vector<int>& freqs){
    //Create a priority_queue to get lowest freqs
    priority_queue<HCNode*, vector<HCNode*>, HCNodePtrComp> pq;

    //Filter out 0 frequencies
    for (int i = 0; i < 256; i++){
        //Convert deci to ascii char
        unsigned char symbol;
        //Make a HCNode for non-zero freqs

        HCNode* node;
        if(freqs[i] != 0){
            symbol = static_cast<unsigned char>(i);
            node = new HCNode(freqs[i], symbol);
            //Make the proper insertions
            leaves.insert(leaves.begin() + i, node);
            pq.push(node);
        }
    }
    
    HCNode* c0;
    HCNode* c1;
    //Loop and merge until priority_queue = 1
     while (pq.size() > 1){
        //Lowest node
        c0 = pq.top();
        pq.pop();
        //Second lowest node
        c1 = pq.top();
        //Sum of freq
        int sum = c0 -> count + c1 -> count;
        //Null symbol
        char nsymbol = static_cast<unsigned char>(0);
        //Create sum node
        HCNode* s = new HCNode(sum, nsymbol);
        //Create the proper relations
        c0 -> p = s;
        c1 -> p = s;
        s -> c0 = c0;
        s -> c1 = c1;
        pq.pop();
        //Add the new node into the queue
        pq.push(s);
     }
     root = pq.top();
}

void HCTree::encode(unsigned char symbol, FancyOutputStream & out) const{
    //Get the leaf that houses the char
    HCNode* leaf = leaves[symbol];
    HCNode* child = leaves[symbol];

    //Follow the tree to the root
    vector<bool> bits;
    while(leaf != root){
        leaf = leaf -> p;
        //Check if the leaf edge is 0 or 1
        if(leaf -> c0 == child){
            bits.insert(bits.begin(),0);
        }
        else{
            bits.insert(bits.begin(),1);
        }
        child = leaf;
    }
    //Write everything in the vector
    for(bool bit : bits){
        cout << bit;
        out.write_bit(bit);
    }
    // out.flush_bitwise();
}

unsigned char HCTree::decode(FancyInputStream & in) const{
    //Current HCNode
    HCNode* curr = root;
    //Read bits until end
    int bit;

    while((bit = in.read_bit())!= -1){
        // cout << bit << endl;
        if(bit == 0){
            curr = curr -> c0;
        }
        else{
            curr = curr -> c1;
        }
        if(curr -> c1 == nullptr){
            return (curr -> symbol);
        }
    }
    if(bit == -1){
        cout << "-1!!" << endl;
    }
    return 0;
}


